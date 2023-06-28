import { Repository } from "typeorm"
import { Image } from "../../entities/images.entity"
import { AppDataSource } from "../../data-source"
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";
import { Car } from "../../entities";
import { AppError } from "../../errors";

export const createImagesService = async (files: any, carId: number) => {
  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image)
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car)

  const car: Car | null = await carRepository.findOneBy({ id: carId })

  if (!car) throw new AppError("Car not found!", 404)

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
  });

  const uploadImage = async (imagePath: string) => {
    const url = await cloudinary.uploader.upload(
      imagePath,
      { resource_type: "image" },
      (error, result) => {
        return result;
      }
    );

    return url;
  };

  const banner = await uploadImage(files.banner[0].path);

  const bannerImage = imageRepository.create({ name: `${files.banner[0].originalname}`, image: `${banner.secure_url}`, car })

  await imageRepository.save(bannerImage)

  let imagesUrl = files.photos.map(async (element: any) => {
    const photo = await uploadImage(element.path);
    const photoImage = imageRepository.create({ name: `${element.originalname}`, image: `${photo.secure_url}`, car })
    return await imageRepository.save(photoImage)
  });

  imagesUrl = await Promise.all(imagesUrl)
    .then((values) => {
      return values;
    })
    .catch(error => console.log(error));

  unlink(files.banner[0].path, (error) => {
    if (error) console.log(error);
  });

  files.photos.map((element: Express.Multer.File) => {
    unlink(element.path, (error) => {
      if (error) console.log(error)
    })
  })

  return { bannerImage, imagesUrl }
}
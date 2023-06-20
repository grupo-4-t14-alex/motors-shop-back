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

    const car: Car | null = await carRepository.findOneBy({id: carId})

    if(!car) throw new AppError("Car not found!", 404)

    cloudinary.config({
        cloud_name: "dglpcnlvm",
        api_key: "677848688736313",
        api_secret: "Ybd0kBg8jT-2P1UqWQg5oiTs8Fo",
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

    const bannerImage = imageRepository.create({name: `${banner.originalname}`, image: `${banner.secure_url}`})

    await imageRepository.save(bannerImage)

    return bannerImage
    
    return {secure_url: banner}

    let imagesUrl = files.photos.map(async (element: any) => {
      console.log(element);
      return await uploadImage(element.path);
    });
  
    imagesUrl = await Promise.all(imagesUrl)
      .then((values) => {
        return values;
      })
      .catch(error => console.log(error));
  
    return banner

}
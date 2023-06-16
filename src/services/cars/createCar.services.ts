import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICar, ICarCreateRequest } from "../../interfaces";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs";
import { error } from "console";
import { Image } from "../../entities/images.entity";
import { AppError } from "../../errors";

const createCarService = async (
  carData: ICarCreateRequest,
  carImages: any,
  userId: number
): Promise<ICar> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);
  const userRepository = AppDataSource.getRepository(User);

  console.log(carData);

  const {
    brand,
    model,
    year,
    fuel,
    km,
    color,
    fipePrice,
    sellPrice,
    description,
  } = carData;

  const findUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not exists", 404);
  }

  const newCar: Car = carRepository.create({
    brand,
    model,
    year,
    fuel,
    km,
    color,
    fipePrice,
    sellPrice,
    description,
    user: findUser,
  });

  await carRepository.save(newCar);

  //   cloudinary.config({
  //     cloud_name: "dglpcnlvm",
  //     api_key: "677848688736313",
  //     api_secret: "Ybd0kBg8jT-2P1UqWQg5oiTs8Fo",
  //   });

  //   const uploadImage = async (imagePath: string) => {
  //     const url = await cloudinary.uploader.upload(
  //       imagePath,
  //       { resource_type: "image" },
  //       (error, result) => {
  //         return result;
  //       }
  //     );
  //     return url.secure_url;
  //   };

  //   const banner = await uploadImage(carImages.banner[0].path);

  //   let imagesUrl = carImages.photos.map(async (element: any) => {
  //     console.log(element);
  //     return await uploadImage(element.path);
  //   });

  //   imagesUrl = await Promise.all(imagesUrl)
  //     .then((values) => {
  //       return values;
  //     })
  //     .catch(error);

  //   const image: Image = imageRepository.create({
  //     name: `${carImages.banner[0].originalname}`,
  //     image: banner,
  //     car: newCar,
  //   });

  //   await imageRepository.save(image);

  return newCar;
};

export { createCarService };

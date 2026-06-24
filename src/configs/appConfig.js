

const appConfig={
    PORT:process.env.PORT,
    DB_URI:process.env.DB_URI,
    JWT_REFRESH_TOKEN:process.env.JWT_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN:process.env.JWT_ACCESS_TOKEN,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY,
    IMAGE_KIT_PUBLIC_KEY:process.env.IMAGE_KIT_PUBLIC_KEY,
    IMAGE_KIT_ENDPOINT:process.env.IMAGE_KIT_ENDPOINT,
}

export default appConfig;
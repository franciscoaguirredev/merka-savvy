import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export const SwaggerConfig = (app: INestApplication<any>): void => {

    const versionApp = "1.0"    
    
    const config = new DocumentBuilder()
    .setTitle('Merka-Savvy')
    .setDescription('Merka-Savvy API the best app for purchases')
    .setVersion(versionApp)
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);

}
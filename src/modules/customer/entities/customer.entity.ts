import { BaseList } from "src/modules/base-list/entities/base-list.entity";
import { PurchaseList } from "src/modules/purchase-list/entities/purchase-list.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    
    @CreateDateColumn()
    registrationDate: Date;

    @UpdateDateColumn()
    lastUpdated: Date;

    @OneToOne(() => BaseList, baseList => baseList.customer)
    baseList: BaseList;

    @OneToMany(() => PurchaseList, purchaseList => purchaseList.customer)
    purchaseLists: PurchaseList[];
}


/* 
import { AppDataSource } from './data-source'; // Ajusta según tu configuración
import { Customer } from './customer.entity'; // Ajusta la ruta según tu estructura

async function getCustomerWithBaseListAndPurchases(customerId: string) {
    const customerRepository = AppDataSource.getRepository(Customer);

    const customer = await customerRepository.findOne({
        where: { uuid: customerId },
        relations: ['baseList', 'purchaseLists'], // Carga la baseList y las compras relacionadas
    });

    console.log(customer);
}
*/ 

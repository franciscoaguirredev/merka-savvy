import { Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import { Customer } from "src/modules/customers/entities/customer.entity";

@Entity("roles")
export class Role{

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string

    @OneToMany(() => Customer,Customer =>Customer.role)
    Customers: Customer[];

}
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseList } from 'src/modules/base-lists/entities/base-list.entity';

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({nullable:false})
    name: string;

    @Column('int', {nullable:false})
    price: number;

    @Column({nullable:false})
    provider: string;

    @Column({nullable:false})
    measure: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToMany(() => BaseList, baseList => baseList.products)
    baseLists: BaseList[];
}

import {Column, Entity, PrimaryColumn} from "typeorm";
import UserType from './enums/usertype'
@Entity()
export class user {

    @PrimaryColumn({ type: 'integer' })
    id?: number ;

    @Column({ type: 'character', nullable: true })
    email?: string | null;

    @Column({ type: 'character',nullable: true })
    password?: string | null;

    @Column({type: 'character', nullable: true })
    type?: UserType | null;

    @Column({type: 'boolean', nullable: true })
    verified?: boolean | null;

    @Column({type: 'time with time zone', nullable: true })
    create_date?: string | null;

    @Column({type: 'time with time zone', nullable: true })
    update_date?: string | null;
}

export default user;
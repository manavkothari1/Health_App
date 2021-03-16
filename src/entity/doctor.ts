import {Column, Entity, PrimaryColumn} from "typeorm";
import Gender from './enums/gender'
@Entity()
export class doctor_profile {

    @PrimaryColumn({ type: 'integer' })
    id?: number ;

    @Column({ type: 'integer', nullable: false })
    user_id?: number | null;
    
    @Column({ type: 'character', nullable: true })
    full_name?: string | null;

    @Column({type: 'character', nullable: true })
    gender?: Gender | null;

    @Column({type: 'character', nullable: true })
    education?: String | null;

    @Column({type: 'integer', nullable: true })
    experience?: string | null;

    @Column({type: 'character', nullable: true })
    licence_no?: string | null;

    @Column({type: 'time with time zone', nullable: true })
    create_date?: string | null;

    @Column({type: 'time with time zone', nullable: true })
    update_date?: string | null;
}

export default doctor_profile;
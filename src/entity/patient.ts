import {Column, Entity, PrimaryColumn} from "typeorm";
import Gender from './enums/gender'
@Entity()
export class patient_profile {

    @PrimaryColumn({ type: 'integer' })
    id?: number ;

    @Column({ type: 'integer', nullable: false })
    user_id?: number | null;
    
    @Column({ type: 'character', nullable: true })
    full_name?: string | null;

    @Column({type: 'character', nullable: true })
    gender?: Gender | null;

    @Column({type: 'integer', nullable: true })
    age?: String | null;

    @Column({type: 'boolean', nullable: true })
    physical_handicapped?: boolean | null;


    @Column({type: 'time with time zone', nullable: true })
    create_date?: string | null;

    @Column({type: 'time with time zone', nullable: true })
    update_date?: string | null;
}

export default patient_profile;
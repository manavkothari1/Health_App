import {Column, Entity, PrimaryColumn} from "typeorm";
@Entity()
export class appointment {

    @PrimaryColumn({ type: 'integer' })
    id?: number ;

    @Column({ type: 'time with time zone', nullable: false })
    date?: string | null;
    
    @Column({ type: 'integer', nullable: true })
    doctor_id?: string | null;

    @Column({type: 'integer', nullable: true })
    patient_id?: string | null;

    @Column({type: 'time with time zone', nullable: true })
    create_date?: string | null;
}

export default appointment;
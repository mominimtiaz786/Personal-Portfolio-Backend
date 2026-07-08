import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface ProjectLink {
  label: string;
  url: string;
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  year: string;

  @Column('text')
  summary: string;

  @Column('text', { nullable: true })
  role: string | null;

  @Column('text', { nullable: true })
  impact: string | null;

  @Column('text', { nullable: true })
  learning: string | null;

  @Column('text', { nullable: true })
  fullStory: string | null;

  @Column('simple-json')
  techStack: string[];

  @Column('simple-json', { nullable: true })
  links: ProjectLink[] | null;

  @Column({ type: 'varchar', nullable: true })
  thumbnail: string | null;

  @Column({ type: 'varchar', nullable: true })
  featuredImage: string | null;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

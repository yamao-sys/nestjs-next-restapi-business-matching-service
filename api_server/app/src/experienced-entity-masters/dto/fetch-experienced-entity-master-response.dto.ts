import { Profession } from '../../professions/entities/profession.entity';

export class FetchExperiencedEntityMasterResponse {
  professions: Pick<Profession, 'id' | 'name'>[];
}

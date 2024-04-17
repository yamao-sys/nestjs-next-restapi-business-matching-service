import { ProgrammingLanguage } from '../../programming-languages/entities/programming-languages.entity';
import { Profession } from '../../professions/entities/profession.entity';

export class FetchExperiencedEntityMasterResponse {
  professions: Pick<Profession, 'id' | 'name'>[];
  programmingLanguages: Pick<ProgrammingLanguage, 'id' | 'name'>[];
}

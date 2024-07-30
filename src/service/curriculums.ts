import http from './http';
import type { Curriculum } from '@/types/Curriculums';
import type { PageParams } from '@/types/PageParams';

function addCurriculum(curriculum: Curriculum) {
  return http.post('/curriculums', curriculum);
}
function updateCurriculum(curriculum: Curriculum) {
  return http.patch(`/curriculums/${curriculum.id}`, curriculum);
}

function delCurriculum(id: string) {
  return http.delete(`/curriculums/${id}`);
}

function getCurriculums() {
  return http.get<Curriculum[]>('/curriculums');
}

function getCurriculum(id: string) {
  return http.get<Curriculum>(`/curriculums/${id}`);
}

function addCoordinator(curriculumId: string, userId: string)  {
  return http.patch(`/curriculums/${curriculumId}/coordinators`, { id: userId });
}

function getCurriculumsByPage(params: PageParams) {
  return http.get<{ data: Curriculum[]; total: number }>(`/curriculums/pages`, { params })
}


export default {
  addCurriculum,
  updateCurriculum,
  delCurriculum,
  getCurriculums,
  getCurriculum,
  addCoordinator,
  getCurriculumsByPage
};

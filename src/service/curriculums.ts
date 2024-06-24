import type { User } from '@/types/User';
import http from './http';
import type { Curriculum } from '@/types/Curriculums';

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




export default {
  addCurriculum,
  updateCurriculum,
  delCurriculum,
  getCurriculums,
  getCurriculum,
  addCoordinator
};
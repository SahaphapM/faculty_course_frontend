import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Curriculum } from '@/types/Curriculums';
import curriculumService from '@/service/curriculums';
import type { User } from '@/types/User';

export const useCurriculumStore = defineStore('curriculum', () => {
  const curriculums = ref<Curriculum[]>([]);
  const currentCurriculum = ref<Curriculum | null>(null);

  const initialCurriculum: Curriculum = {
    id: '',
    thaiName: '',
    engName: '',
    thaiDegreeName: '',
    engDegreeName: '',
    description: '',
    coordinators: null,
    period: 0,
    minimumGrade: 0,
  };

  const editedCurriculum = ref<Curriculum>({ ...initialCurriculum });

  function clearCurrentCurriculum() {
    currentCurriculum.value = null;
  }

  const addCurriculum = (curriculum: Curriculum) => {
    curriculums.value.push(curriculum);
  };

  async function fetchCurriculum(id: string) {
    const res = await curriculumService.getCurriculum(id);
    editedCurriculum.value = res.data;
  }

  async function fetchCurriculums() {
    const res = await curriculumService.getCurriculums();
    curriculums.value = res.data;
  }


  async function saveCurriculum() {
    const curriculum = editedCurriculum.value;
    await curriculumService.addCurriculum(curriculum);
  }

  async function updateCurriculum() {
    const curriculum = editedCurriculum.value;
    await curriculumService.updateCurriculum(curriculum);
  }



  async function addCoordinatorToCurriculum(curriculumId: string, userId: string) {
    await curriculumService.addCoordinator(curriculumId, userId);
  }

  async function deleteCurriculum(id: string) {
    await curriculumService.delCurriculum(id);
    await fetchCurriculums();
  }

  function clearForm() {
    editedCurriculum.value = { ...initialCurriculum };
  }

  return {
    addCurriculum,
    curriculums,
    currentCurriculum,
    clearCurrentCurriculum,
    fetchCurriculum,
    fetchCurriculums,
    saveCurriculum,
    deleteCurriculum,
    editedCurriculum,
    clearForm, addCoordinatorToCurriculum
  };
});
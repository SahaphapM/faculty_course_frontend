import type { Subject } from "@/types/Subjects";
import { defineStore } from "pinia";
import { ref } from "vue";
import subjectService from '@/service/subject';
export const useSubjectStore = defineStore('subjectStore', () => {
    const subjects = ref<Subject[]>([]);
    const currentSubject = ref<Subject | null>(null);

    const initialSubject: Subject = {
        id: "",
        thaiName: "",
        engName: "",
        description: "",
        credit: 0,
        type: "",
        studyTime: ""
    };

    const editedSubject = ref<Subject>(JSON.parse(JSON.stringify(initialSubject)));

    function clearCurrentSubject() {
        currentSubject.value = null;
    }

    const addSubject = (subject: Subject) => {
        subjects.value.push(subject);
    };

    async function fetchSubject(id: string) {
        const res = await subjectService.getSubject(id);
        editedSubject.value = res.data;
    }

    async function fetchSubjects() {
        try {
            const res = await subjectService.getSubjects();
            subjects.value = res.data;
            console.log('Call fetchSubjects')
            console.log(res);
            console.log(subjects.value);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }

    async function saveSubject() {
        const subject = editedSubject.value;
        console.log(subject)
        console.log('call funtion addSubject')
        const res = await subjectService.addSubject(subject);
        // const st = subject.teachers?.id
        // console.log(st)
        // await subjectService.addCoordinator(subject.id, subject.teachers.id)
        await fetchSubjects()
        console.log('Save to service' + res)
    }

    async function updateSubject() {
        const subject = editedSubject.value;
        await subjectService.updateSubject(subject);
    }



    async function addCoordinatorToSubject(subjectId: string, userId: string) {
        await subjectService.addCoordinator(subjectId, userId);
    }

    async function deleteSubject() {
        console.log('Call deleteSubject in store')
        const subject = editedSubject.value
        console.log(subject.id)
        await subjectService.delSubject(subject.id);
        await fetchSubjects();
    }

    function clearForm() {
        editedSubject.value = JSON.parse(JSON.stringify(initialSubject));
    }

    return {
        subjects,
        addSubject,
        clearCurrentSubject,
        clearForm,
        fetchSubject,
        fetchSubjects,
        editedSubject,
        saveSubject,
        updateSubject,
        addCoordinatorToSubject,
        deleteSubject
    };
});
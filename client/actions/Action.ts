"use server"
import axios from 'axios';


interface FormData {
    Age: number;
    Sex: number;  // 0 = Female, 1 = Male
    ChestPainType: number; // 0 = ATA, 1 = NAP, 2 = ASY
    RestingBP: number;
    Cholesterol: number;
    FastingBS: number; // 0 = ปกติ, 1 = สูง
    RestingECG: number; // 0 = Normal, 1 = ST, 2 = LVH
    MaxHR: number;
    ExerciseAngina: number; // 0 = ไม่มีอาการเจ็บหน้าอก, 1 = มีอาการเจ็บหน้าอก
    Oldpeak: number;  // ค่าที่อาจเป็นทศนิยม
    ST_Slope: number; // 0 = Up, 1 = Flat, 2 = Down
    HeartDisease: number; // 0 = ไม่มีโรคหัวใจ, 1 = มีโรคหัวใจ
}

export const predictCNNModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/CNN`, {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
};

export const predictKNNModel = async (form : FormData) => {
    try{


        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/KNN`,  form);

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const predictLRModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/LR`, {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}
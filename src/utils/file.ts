import fs from "fs";

export const  deleteFile = async(filename:string) => { 

    try{
        await fs.promises.stat(filename) //esse stat verifica se um arquivo existe 
    }catch{
        return;
    }
    await fs.promises.unlink(filename); //esse unlink vai ser o responsável remover o arquivo com o filename que a gente passar
} 
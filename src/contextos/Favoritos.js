import { createContext, useContext, useState } from "react";

export const FavoritosContext = createContext();

FavoritosContext.displayName = "Favoritos";

export default function FavoritosProvider({ children }){
    const [favorito, setFavorito] = useState([]);

    return(
        <FavoritosContext.Provider
        value={{favorito, setFavorito}}>
            {children}
        </FavoritosContext.Provider>
    )
}

export function useFavoriteContext(){
    const { favorito, setFavorito } = useContext(FavoritosContext);
    function adicionarFavorito(novoFavorito){
        const favoritoRepetido = favorito.some(item => item.id === novoFavorito.id)
        let novaLista = [...favorito];
        // procura se tem o mesmo ID ja favoritado
        if(!favoritoRepetido){
            novaLista.push(novoFavorito);
            return setFavorito(novaLista);
        }
        novaLista.splice(novaLista.indexOf(novoFavorito), 1);
        return setFavorito(novaLista);
    }
    return {
        favorito,
        adicionarFavorito
    }
}
// splice procura e tira o item que esta dentro com base no indexOf, assim na lista tera um item a menos na novalista.
// criado um hook personalizado, nota-se pq começa com Use.
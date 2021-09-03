var pokemons = [];
        var h = [];
        // h é o vetor que contem as habilitade do pokemom em especifico
        var quantidade = 0;
        listarpokemons(1);
        var input = document.getElementById("quantidade");
        var button = document.getElementById("botao");
        button.addEventListener("click",()=>{
            listarpokemons(input.value);
        })
        function ocultarHabilidades(){
            let abl = document.querySelectorAll(".habilidades");
            abl.forEach((value)=>{
                value.style.display = "none";
            })
        }
        function mostrarHabilidade(){
            let box = document.querySelectorAll(".pokemom-box span");
            box.forEach((value,index)=>{
                value.addEventListener("click",()=>{        
                    let abl = document.querySelectorAll(".habilidades")[index]; 
                    if(abl.style.display == "none"){
                        abl.style.display = "block";
                        box[index].innerHTML = "ocultar";
                    }else if(abl.style.display == "block"){
                        abl.style.display = "none";
                        box[index].innerHTML = "ver habilidades";
                    }
                })
            })
        }

        function listarpokemons(qtd){
        fetch("https://pokeapi.co/api/v2/pokemon?limit="+qtd,{
            method:"GET"
        }).then((result)=>{
            return result.json()
        }).then((allPokemons)=>{
            
            allPokemons.results.map((value, index)=>{
                fetch(value.url).then((result)=>{
                    return result.json();
                }).then(pokemom =>{  
                    let habilidades = pokemom.abilities;
                    // Tentando pegar a descrição das habilidades
                    /*habilidades.map((value)=>{ 
                        fetch(value.ability.url).then(response => response.json())
                        .then(abilies =>{
                            console.log(abilies);
                        })
                    })
                    */
                    habilidades.map((value)=>{
                        h.push(value.ability.name);
                    })
                    
                    pokemons.push({name: value.name,
                        imagem: pokemom.sprites.front_default,
                        habilidades: h
                    });
                    h = [];
                    if(pokemons.length == qtd){
                    let boxes = document.querySelector(".pokemon-boxes");
                    
                        boxes.innerHTML="";

                        pokemons.map((val)=>{
                            boxes.innerHTML += `
                            <div class="pokemom-box">
                                <div class="pokemom-header">
                                    <img src="${val.imagem}">
                                    <p>${val.name}</p>
                                    <span>ver habilidades</span>
                                </div>
                                <p class="habilidades">Habilidades:<br> ${val.habilidades}</p>
                            </div>
                        `
                        })
                        ocultarHabilidades();
                        mostrarHabilidade();
                    }
                })
            })
            
        })
    }
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Box, Text, UnorderedList, ListItem, Button } from "@chakra-ui/react"
import { UserContext } from "../contexts/User"

const Home = () => {
  const [pokemon, setPokemon] = useState(null)
  const { isLogged } = useContext(UserContext)

  useEffect(() => { // => componentDidMount
    getPokemon(1)
  }, [])

  const getPokemon = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
  }

  const handleButtonClick = () => {
    const randomId = Math.floor(Math.random() * 151 + 1)
    getPokemon(randomId)
  }

  if (!pokemon) {
    return <p>Pas de pokemon</p>
  }

  if (!isLogged) {
    return (
      <>
        <Link to="/login">Vous n'etes pas connecté. Retour page login</Link>
      </>
    )
  }

  return (
    <Box>
       <Box border="1px" borderColor="teal" borderRadius={5} p={5}>
        <Box mb={5}>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        </Box>
        <Text as="h1" fontSize="30px" casing="capitalize">{pokemon.name}</Text>
        <Text><b>Height:</b> {pokemon.height}</Text>
        <Text><b>Weight:</b> {pokemon.weight}</Text>
        <Text><b>Types:</b></Text>
        <UnorderedList>
          {pokemon.types.map(type => (
            <ListItem key={type.type.name}>{type.type.name}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      
      <Button colorScheme="teal" variant="solid" w="100%" mt={5} onClick={handleButtonClick}>
        Get random pokemon
      </Button>
    </Box>

  )
}

export default Home

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const Test = () => {
    const [name, setName] = useState('')
    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleSubmit = () => {
        console.log(name)
    }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      </Box>)
}
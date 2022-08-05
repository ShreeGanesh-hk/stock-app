import styled from '@emotion/styled';
import { createTheme, TextField, TextFieldProps, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const textTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#fff'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#fff'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#fff'
                },
                notchedOutline: {
                    borderColor: "#fff"
                }
            }
        }
    }


})

function CustomTextField(props: TextFieldProps) {
    return (
        <ThemeProvider theme={textTheme}>
            <TextField label="Token"
                id="outlined-size-small"
                placeholder='Please enter your token'
                defaultValue={props.defaultValue}
                size="small"
                onChange={props.onChange} />
        </ThemeProvider>
    )
}

export default CustomTextField
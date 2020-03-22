import * as React from 'react'
import { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { convert, download } from './utils'
import Button from '@material-ui/core/Button'

export const App: React.FC = () => {
  const [originalLog, setOriginalLog] = useState('');
  const [filename, setFilename] = useState('');

  const convertedLog = convert(originalLog)

  return <Container maxWidth="sm">
    <Card
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }}

      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const reader = new FileReader();
        reader.onloadend = () => {
          setOriginalLog(reader.result as string);
        }
        const file = e.dataTransfer.files[0];

        reader.readAsText(file);
        setFilename(file.name);
      }
      } >
      <CardContent>
        <Typography color="textSecondary" align="center">
          Drop file here
      </Typography>
      </CardContent>
    </Card>

    {originalLog.length > 0 &&
      <>
        <Typography variant="h4">
          Original
        </Typography>
        <TextField value={originalLog} multiline rowsMax={10} variant="outlined" style={{ width: "100%" }} />
        <Typography variant="h4">
          Converted
        </Typography>
        <TextField value={convertedLog} multiline rowsMax={10} variant="outlined" style={{ width: "100%" }} />
        <Button variant="contained" color="primary" onClick={() => {
          download({ filename, text: convertedLog })
        }}>
          Download
        </Button>
      </>
    }
  </Container >
}

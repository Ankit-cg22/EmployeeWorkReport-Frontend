import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

const ActivityList = ({data}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Work Category</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.work_category}</TableCell>
              <TableCell>{row.hours}</TableCell>
              <TableCell>{row.minutes}</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant="outlined"
                  value={row.description}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityList;

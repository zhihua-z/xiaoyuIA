import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MyAppbar from '../components/MyAppbar';
import MyNavigation from '../components/Mynavigation';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



interface Column {
    id: 'task' | 'info' | 'date';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    task: string;
    info: string;
    date: string;

}

const columns: Column[] = [
    { id: 'task', label: 'Tasks' },
    { id: 'info', label: 'Description' },
    { id: 'date', label: 'Date' }
];

function createData(
    task: string,
    info: string,
    date: string,
): Data {
    return { task, info, date };
}

const rows = [
    createData('Task1', '', '2024/12/12'),
    createData('Task2', '', '2024/12/12'),
    createData('Task3', '', '2024/12/12'),
    createData('Task4', '', '2024/12/12'),
    createData('Task5', '', '2024/12/12'),
    createData('Task6', '', '2024/12/12'),
    createData('Task7', '', '2024/12/12')

]




export const MyHello = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )

}


const TaskPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppbar />
            <MyHello />
            <MyNavigation />
        </Box>
    )

}
export default TaskPage;
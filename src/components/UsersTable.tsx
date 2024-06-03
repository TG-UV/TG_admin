/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useNavigate } from 'react-router-dom';

const RowMenu = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={() => {
            navigate('/edit/' + id);
          }}
        >
          Editar
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate('/delete/' + id);
          }}
          color="danger"
        >
          Eliminar
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

const UsersTable = ({
  rows,
  userTypes,
  cities,
  count,
  next,
  previous,
  actual,
}) => {
  const navigate = useNavigate();
  const previousPage = previous
    ? new URL(previous).searchParams.get('page') ?? ''
    : '';
  const nextPage = next ? new URL(next).searchParams.get('page') ?? '' : '';

  function generateList(count: number): string[] {
    let result: string[] = [];
    let pages: number = Math.ceil(count / 10);

    for (let i = 1; i <= 3; i++) {
      if (i < pages) {
        result.push(i.toString());
      }
    }

    if (pages > 5) {
      result.push('...');
    }

    for (let i = Math.max(4, pages - 2); i < pages; i++) {
      result.push(i.toString());
    }
    result.push(pages.toString());
    return result;
  }

  const pageNumbers = generateList(count);

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex' },
          my: 1,
          gap: 1,
        }}
      ></Sheet>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 40, textAlign: 'center', padding: '12px 6px' }}
              ></th>
              <th style={{ width: 120, padding: '12px 6px' }}>Id</th>
              <th style={{ width: 140, padding: '12px 6px' }}>
                Tipo de usuario
              </th>
              <th style={{ width: 200, padding: '12px 6px' }}>
                Fecha de registro
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Estado</th>
              <th style={{ width: 240, padding: '12px 6px' }}>
                Ciudad de residencia
              </th>
              <th style={{ width: 300, padding: '12px 6px' }}>Usuario</th>
              <th style={{ width: 60, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id_user}>
                <td style={{ textAlign: 'center', width: 120 }}></td>
                <td>
                  <Typography level="body-xs">{row.id_user}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{userTypes[row.type]}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {row.registration_date}
                  </Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        true: <CheckRoundedIcon />,
                        false: <ClearIcon />,
                      }[row.is_active ? 'true' : 'false']
                    }
                    color={
                      {
                        true: 'success',
                        false: 'danger',
                      }[row.is_active ? 'true' : 'false'] as ColorPaletteProp
                    }
                  >
                    {row.is_active ? 'Activo' : 'Inactivo'}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">
                    {cities[row.residence_city]}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.first_name[0]}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.first_name + ' ' + row.last_name}
                      </Typography>
                      <Typography level="body-xs">{row.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu id={row.id_user} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          disabled={previous ? false : true}
          onClick={() => {
            navigate('/list/' + previousPage);
          }}
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Anterior
        </Button>

        <Box sx={{ flex: 1 }} />
        {pageNumbers.map((page) => (
          <IconButton
            key={page}
            onClick={() => {
              navigate('/list/' + page);
            }}
            size="sm"
            variant={
              page === (actual === undefined ? '1' : actual) ? 'solid' : 'plain'
            }
            color="primary"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          disabled={next ? false : true}
          onClick={() => {
            navigate('/list/' + nextPage);
          }}
          
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default UsersTable;

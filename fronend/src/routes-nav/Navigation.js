import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser);
  
    function loggedInNav() {
      return (
        <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Personal Ledger
                </Typography>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  
                    <Button
                      key="profile"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/expenses/currentmonth"
                    >
                      Current Month
                    </Button>
                    <Button
                      key="profile"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/expenses/searchmonthly"
                    >
                      Search By Month
                    </Button>
                    <Button
                      key="transactions"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/expenses"
                    >
                      All Transactions
                    </Button>
                    <Button
                      key="profile"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/profile"
                    >
                      Profile
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <Button
                      key="logout"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Tooltip>
                </Box>
                {/* <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/expenses">
                Expenses
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={logout}>
                Log out {currentUser.user.first_name || currentUser.user.username}
              </Link>
            </li>
          </ul> */}
              </Toolbar>
            </Container>
          </AppBar>
      );
    }
  
    function loggedOutNav() {
      return (          
              <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Personal Ledger
                  </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                  <Button
                      key="transactions"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/login"
                    >
                      Log In
                    </Button>
                    <Button
                      key="profile"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/register"
                    >
                      Sign Up
                    </Button>
                </Box>

                {/* <Box float='right'>
                    <Button
                      key="logout"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href="/login"
                    >
                      Login
                    </Button>
                </Box> */}
                </Toolbar>

              </Container>          
              {/* <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item mr-4">
                  <NavLink className="nav-link" to="/register">
                    Sign Up
                  </NavLink>
                </li>
              </ul> */}
            </AppBar>
  

      );
    }
  
    return (
      <div>
        <nav className="Navigation navbar navbar-expand-md">
          {/* <Link className="navbar-brand" to="/">
            Ledger
          </Link> */}
          {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
          </div>
    );
  }
  
  export default Navigation;
  
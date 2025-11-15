import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Badge } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState, useEffect } from 'react'
import api from '../services/api'
import NotificationDrawer from './NotificationDrawer'
import UIET_Logo from '../assets/images/UIET_logo.png';

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [notificationCount, setNotificationCount] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotificationCount()
    }
  }, [isAuthenticated])

  const fetchNotificationCount = async () => {
    try {
      const response = await api.get('/achievements/notifications/')
      const unreadCount = response.data.filter(n => !n.is_read).length
      setNotificationCount(unreadCount)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNotificationUpdate = () => {
    fetchNotificationCount()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={3} 
      sx={{ 
        backgroundColor: '#0D47A1', // Better blue
        background: 'linear-gradient(90deg, #0D47A1 0%, #42A5F5 100%)',
      }}>
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box
              component="img"
              src={UIET_Logo}
              alt="UIET Logo"
              sx={{ height: 50, mr: 2 }}
            />
            <Box>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 700,
                  lineHeight: 1.1
                }}
              >
                UIET Student Achievement Portal
              </Typography>
              <Typography variant="caption" color="white" sx={{ opacity: 0.9, fontSize: '0.7rem', display: 'block' }}>
                University Institute of Engineering and Technology
              </Typography>
              <Typography variant="caption" color="white" sx={{ opacity: 0.8, fontSize: '0.65rem', display: 'block' }}>
                PANJAB UNIVERSITY, CHANDIGARH (U.T.) 160014
              </Typography> 
              
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            <>
              {user?.role === 'student' && (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/profile">
                    My Profile
                  </Button>
                  <Button color="inherit" component={Link} to="/achievements">
                    Achievements
                  </Button>
                </>
              )}

              {user?.role === 'coordinator' && (
                <Button color="inherit" component={Link} to="/coordinator">
                  Coordinator Dashboard
                </Button>
              )}

              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#0F2D52',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            University Institute of Engineering & Technology
          </Typography>
          <Typography variant="body2" align="center" sx={{ fontWeight: 300 }}>
            Panjab University, Chandigarh
          </Typography>
          <Typography variant="caption" align="center" display="block" sx={{ mt: 2, opacity: 0.8 }}>
            © 2025 UIET Student Achievement Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onUpdate={handleNotificationUpdate}
      />
    </Box>
  )
}

export default Layout
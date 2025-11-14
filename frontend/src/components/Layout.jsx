import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Badge } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState, useEffect } from 'react'
import api from '../services/api'
import NotificationDrawer from './NotificationDrawer'

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
      <AppBar position="static" elevation={3} sx={{ backgroundColor: '#0F2D52' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box
            component="img"
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=120"
            alt="Panjab University Logo"
            sx={{ height: 60, mr: 2 }}
          />

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
            }}
          >
            Student Achievement Portal
          </Typography>

          <Box
            component="img"
            src="https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=120"
            alt="UIET Logo"
            sx={{ height: 60, mr: 2 }}
          />

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
            © 2024 UIET Student Achievement Portal. All rights reserved.
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

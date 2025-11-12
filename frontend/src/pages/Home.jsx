import { Box, Typography, Button, Container, Grid, Card, CardContent, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SchoolIcon from '@mui/icons-material/School'
import VerifiedIcon from '@mui/icons-material/Verified'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Box>
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: 8,
          px: 3,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom fontWeight={700}>
            Student Achievement Portal
          </Typography>
          <Typography variant="h5" align="center" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Showcase your accomplishments, track your progress, and celebrate your success
          </Typography>
          {!isAuthenticated && (
            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <EmojiEventsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Track Achievements
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Document and showcase your academic, technical, and extracurricular achievements in one place
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Get Verified
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Coordinators verify your achievements, adding credibility and recognition to your profile
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Public Profiles
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Share your profile publicly to showcase your journey and accomplishments to the world
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Ready to get started?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Join hundreds of students showcasing their achievements
          </Typography>
          {!isAuthenticated && (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Create Your Profile
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Home

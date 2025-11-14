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
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 12,
          px: 3,
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 45, 82, 0.85)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#D4AF37',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 1
              }}
            >
              University Institute of Engineering & Technology
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4
              }}
            >
              Panjab University, Chandigarh
            </Typography>
          </Box>

          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight={700}
            sx={{
              fontFamily: 'Georgia, serif',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            UIET Student Achievement Portal
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{
              mb: 5,
              opacity: 0.95,
              fontWeight: 300,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Celebrating Student Excellence and Success
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{
              mb: 5,
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            A comprehensive platform to document, showcase, and verify academic achievements, technical skills, and extracurricular accomplishments of UIET students
          </Typography>
          {!isAuthenticated && (
            <Box display="flex" justifyContent="center" gap={3}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#D4AF37',
                  color: '#0F2D52',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
                  '&:hover': {
                    backgroundColor: '#b89527',
                    boxShadow: '0 6px 16px rgba(212, 175, 55, 0.5)',
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
                  borderColor: '#D4AF37',
                  borderWidth: 2,
                  color: '#D4AF37',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#D4AF37',
                    borderWidth: 2,
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight={700} sx={{ color: '#0F2D52', fontFamily: 'Georgia, serif' }}>
            Features
          </Typography>
          <Box sx={{ width: 80, height: 4, backgroundColor: '#D4AF37', mx: 'auto', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            A comprehensive system designed for UIET students to document and celebrate their academic journey
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                border: '2px solid transparent',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: '#D4AF37',
                  boxShadow: '0 8px 24px rgba(15, 45, 82, 0.15)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 5 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 45, 82, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <EmojiEventsIcon sx={{ fontSize: 40, color: '#0F2D52' }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color: '#0F2D52' }}>
                  Track Achievements
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Document and showcase your academic, technical, and extracurricular achievements in one centralized platform
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                border: '2px solid transparent',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: '#D4AF37',
                  boxShadow: '0 8px 24px rgba(15, 45, 82, 0.15)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 5 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 45, 82, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: 40, color: '#0F2D52' }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color: '#0F2D52' }}>
                  Get Verified
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Faculty coordinators verify your achievements, adding official credibility and institutional recognition
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                border: '2px solid transparent',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: '#D4AF37',
                  boxShadow: '0 8px 24px rgba(15, 45, 82, 0.15)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 5 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 45, 82, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 40, color: '#0F2D52' }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color: '#0F2D52' }}>
                  Public Profiles
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Share your verified profile publicly to showcase your academic journey and accomplishments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 8,
            p: 6,
            textAlign: 'center',
            backgroundColor: '#0F2D52',
            borderRadius: 2,
            color: 'white',
          }}
        >
          <Typography variant="h3" gutterBottom fontWeight={700} sx={{ fontFamily: 'Georgia, serif' }}>
            Ready to get started?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9, fontWeight: 300, mb: 4 }}>
            Join the UIET community in documenting and celebrating student excellence
          </Typography>
          {!isAuthenticated && (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: '#D4AF37',
                color: '#0F2D52',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
                '&:hover': {
                  backgroundColor: '#b89527',
                  boxShadow: '0 6px 16px rgba(212, 175, 55, 0.5)',
                },
              }}
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

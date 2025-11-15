import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Divider,
  Link,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import SchoolIcon from '@mui/icons-material/School'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import api from '../services/api'

const PublicProfile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfileData()
  }, [id])

  const fetchProfileData = async () => {
    try {
      const [profileRes, achievementsRes] = await Promise.all([
        api.get(`/profiles/${id}/`),
        api.get(`/achievements/list/?student_id=${id}&status=verified`),
      ])

      setProfile(profileRes.data)
      setAchievements(achievementsRes.data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error || !profile) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            {error || 'Profile not found'}
          </Typography>
        </Paper>
      </Container>
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'primary',
      sports: 'success',
      cultural: 'secondary',
      technical: 'info',
      leadership: 'warning',
      community: 'success',
      research: 'primary',
      other: 'default',
    }
    return colors[category] || 'default'
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.profile_picture}
              sx={{ width: 180, height: 180, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h4" fontWeight={600}>
              {profile.full_name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Roll No: {profile.student_id}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              {profile.bio || 'No bio available'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {profile.student_id && (
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Roll Number:</strong> {profile.student_id}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {profile.department && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Department:</strong> {profile.department}
                  </Typography>
                </Grid>
              )}

              {profile.year && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Year:</strong> {profile.year}
                  </Typography>
                </Grid>
              )}

              {profile.gpa && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>CGPA:</strong> {profile.gpa}
                  </Typography>
                </Grid>
              )}

              {profile.email && (
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">{profile.email}</Typography>
                  </Box>
                </Grid>
              )}

              {profile.phone && (
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2">{profile.phone}</Typography>
                  </Box>
                </Grid>
              )}

              {profile.linkedin_url && (
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <LinkedInIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Link href={profile.linkedin_url} target="_blank" rel="noopener">
                      LinkedIn
                    </Link>
                  </Box>
                </Grid>
              )}

              {profile.github_url && (
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <GitHubIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Link href={profile.github_url} target="_blank" rel="noopener">
                      GitHub
                    </Link>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
        <EmojiEventsIcon sx={{ mr: 1, fontSize: 32 }} />
        Achievements ({achievements.length})
      </Typography>

      {achievements.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No verified achievements yet
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} md={6} key={achievement.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {achievement.title}
                    </Typography>
                    <Chip
                      label={achievement.category}
                      color={getCategoryColor(achievement.category)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {achievement.description}
                  </Typography>
                  {achievement.achievement_date && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(achievement.achievement_date).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default PublicProfile

import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Chip } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import VerifiedIcon from '@mui/icons-material/Verified'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/achievements/list/my_achievements/')
      const achievements = response.data

      const stats = {
        total: achievements.length,
        verified: achievements.filter(a => a.status === 'verified').length,
        pending: achievements.filter(a => a.status === 'pending').length,
        rejected: achievements.filter(a => a.status === 'rejected').length,
      }

      setStats(stats)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Welcome, {user?.first_name || user?.username}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Here's an overview of your achievements
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EmojiEventsIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight={700}>
                  {stats?.total || 0}
                </Typography>
              </Box>
              <Typography variant="h6">Total Achievements</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight={700}>
                  {stats?.verified || 0}
                </Typography>
              </Box>
              <Typography variant="h6">Verified</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PendingIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight={700}>
                  {stats?.pending || 0}
                </Typography>
              </Box>
              <Typography variant="h6">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CancelIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h3" fontWeight={700}>
                  {stats?.rejected || 0}
                </Typography>
              </Box>
              <Typography variant="h6">Rejected</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Quick Actions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use the navigation menu to:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="Update your profile" sx={{ m: 0.5 }} />
          <Chip label="Submit new achievements" sx={{ m: 0.5 }} />
          <Chip label="View achievement status" sx={{ m: 0.5 }} />
          <Chip label="Check notifications" sx={{ m: 0.5 }} />
        </Box>
      </Card>
    </Box>
  )
}

export default Dashboard

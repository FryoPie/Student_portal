import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Link,
  Divider,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import api from '../services/api'
import { Link as RouterLink } from 'react-router-dom'

const CoordinatorDashboard = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [verificationNotes, setVerificationNotes] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPendingAchievements()
  }, [])

  const fetchPendingAchievements = async () => {
    try {
      const response = await api.get('/achievements/list/pending/')
      setAchievements(response.data)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (achievement) => {
    setSelectedAchievement(achievement)
    setVerificationNotes('')
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedAchievement(null)
    setVerificationNotes('')
  }

  const handleVerify = async (status) => {
    if (!selectedAchievement) return

    setError('')
    setSuccess('')

    try {
      await api.post(`/achievements/list/${selectedAchievement.id}/verify/`, {
        status,
        verification_notes: verificationNotes,
      })

      setSuccess(`Achievement ${status === 'verified' ? 'verified' : 'rejected'} successfully!`)
      handleCloseDialog()
      fetchPendingAchievements()
    } catch (err) {
      setError('Failed to update achievement status')
    }
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Coordinator Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Review and verify pending student achievements
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {achievements.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No pending achievements to review
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} key={achievement.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600} flex={1}>
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

                      <Box mb={1}>
                        <Typography variant="body2">
                          <strong>Student:</strong>{' '}
                          <Link
                            component={RouterLink}
                            to={`/profile/${achievement.student_id}`}
                          >
                            {achievement.student_name}
                          </Link>
                        </Typography>
                      </Box>

                      {achievement.achievement_date && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Date:</strong>{' '}
                          {new Date(achievement.achievement_date).toLocaleDateString()}
                        </Typography>
                      )}

                      {achievement.proof_document && (
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AttachFileIcon />}
                            href={achievement.proof_document}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Proof Document
                          </Button>
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        height="100%"
                        justifyContent="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenDialog(achievement)}
                          fullWidth
                        >
                          Review
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Review Achievement</DialogTitle>
        <DialogContent>
          {selectedAchievement && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedAchievement.title}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Category:</strong> {selectedAchievement.category}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedAchievement.description}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Student:</strong> {selectedAchievement.student_name}
              </Typography>

              {selectedAchievement.achievement_date && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedAchievement.achievement_date).toLocaleDateString()}
                </Typography>
              )}

              {selectedAchievement.proof_document && (
                <Box mb={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AttachFileIcon />}
                    href={selectedAchievement.proof_document}
                    target="_blank"
                  >
                    View Proof Document
                  </Button>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <TextField
                fullWidth
                label="Verification Notes (Optional)"
                multiline
                rows={3}
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                placeholder="Add any comments or feedback..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => handleVerify('rejected')}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleVerify('verified')}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CoordinatorDashboard

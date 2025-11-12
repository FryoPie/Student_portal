import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import api from '../services/api'

const Achievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'academic',
    achievement_date: '',
  })
  const [selectedFile, setSelectedFile] = useState(null)

  const categories = [
    { value: 'academic', label: 'Academic Excellence' },
    { value: 'sports', label: 'Sports & Athletics' },
    { value: 'cultural', label: 'Cultural Activities' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'community', label: 'Community Service' },
    { value: 'research', label: 'Research & Publications' },
    { value: 'other', label: 'Other' },
  ]

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await api.get('/achievements/list/my_achievements/')
      setAchievements(response.data)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (achievement = null) => {
    if (achievement) {
      setEditMode(true)
      setSelectedAchievement(achievement)
      setFormData({
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        achievement_date: achievement.achievement_date || '',
      })
    } else {
      setEditMode(false)
      setSelectedAchievement(null)
      setFormData({
        title: '',
        description: '',
        category: 'academic',
        achievement_date: '',
      })
    }
    setSelectedFile(null)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditMode(false)
    setSelectedAchievement(null)
    setFormData({
      title: '',
      description: '',
      category: 'academic',
      achievement_date: '',
    })
    setSelectedFile(null)
    setError('')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!formData.title || !formData.description) {
      setError('Title and description are required')
      return
    }

    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('category', formData.category)
      if (formData.achievement_date) {
        data.append('achievement_date', formData.achievement_date)
      }
      if (selectedFile) {
        data.append('proof_document', selectedFile)
      }

      if (editMode && selectedAchievement) {
        await api.patch(`/achievements/list/${selectedAchievement.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setSuccess('Achievement updated successfully!')
      } else {
        data.append('status', 'pending')
        await api.post('/achievements/list/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setSuccess('Achievement submitted successfully!')
      }

      handleCloseDialog()
      fetchAchievements()
    } catch (err) {
      setError('Failed to save achievement. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return
    }

    try {
      await api.delete(`/achievements/list/${id}/`)
      setSuccess('Achievement deleted successfully!')
      fetchAchievements()
    } catch (error) {
      setError('Failed to delete achievement')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      verified: 'success',
      rejected: 'error',
    }
    return colors[status] || 'default'
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          My Achievements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Achievement
        </Button>
      </Box>

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
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No achievements yet. Start by adding your first achievement!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} md={6} key={achievement.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" fontWeight={600} flex={1}>
                      {achievement.title}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(achievement)}
                        disabled={achievement.status === 'verified'}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(achievement.id)}
                        disabled={achievement.status === 'verified'}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box mb={2}>
                    <Chip
                      label={achievement.status}
                      color={getStatusColor(achievement.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
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
                    <Typography variant="caption" color="text.secondary" display="block">
                      Date: {new Date(achievement.achievement_date).toLocaleDateString()}
                    </Typography>
                  )}

                  {achievement.proof_document && (
                    <Box mt={1}>
                      <Chip
                        icon={<AttachFileIcon />}
                        label="Proof Attached"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  )}

                  {achievement.verification_notes && (
                    <Alert severity={achievement.status === 'verified' ? 'success' : 'error'} sx={{ mt: 2 }}>
                      <strong>Note:</strong> {achievement.verification_notes}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Achievement' : 'Add New Achievement'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Achievement Date"
            name="achievement_date"
            type="date"
            value={formData.achievement_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Box mt={2}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Proof Document
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Achievements

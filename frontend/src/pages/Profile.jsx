import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me/')
      setProfile(response.data)
      if (response.data.profile_picture) {
        setPreviewUrl(response.data.profile_picture)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const formData = new FormData()

      if (selectedFile) {
        formData.append('profile_picture', selectedFile)
      }

      Object.keys(profile).forEach(key => {
        if (key !== 'profile_picture' && key !== 'user' && key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'username' && key !== 'email' && key !== 'full_name') {
          if (profile[key] !== null && profile[key] !== undefined) {
            formData.append(key, profile[key])
          }
        }
      })

      await api.patch(`/profiles/${profile.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess('Profile updated successfully!')
      fetchProfile()
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Update your profile information
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

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={previewUrl}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Button variant="outlined" component="label">
              Upload Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={user?.username || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Roll_Number"
                name="student_id"
                value={profile?.student_id || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={profile?.department || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                value={profile?.year || ''}
                onChange={handleChange}
                placeholder="2026, 2027, 2028.."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CGPA"
                name="cgpa"
                type="number"
                inputProps={{ step: 0.1, min: 0, max: 10 }}
                value={profile?.cgpa || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profile?.phone || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={profile?.bio || ''}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                name="linkedin_url"
                value={profile?.linkedin_url || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                name="github_url"
                value={profile?.github_url || ''}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Profile

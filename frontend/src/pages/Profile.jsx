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
  Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editedProfile, setEditedProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(false)
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
      setEditedProfile(response.data)
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

  const handleEdit = () => {
    setEditMode(true)
    setEditedProfile({ ...profile })
    setSelectedFile(null)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditedProfile({ ...profile })
    setSelectedFile(null)
    setPreviewUrl(profile.profile_picture)
    setError('')
    setSuccess('')
  }

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
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

      const allowedFields = [
        'department',
        'year',
        'cgpa',
        'phone',
        'bio',
        'linkedin_url',
        'github_url'
      ]

      allowedFields.forEach(field => {
        if (editedProfile[field] !== null && editedProfile[field] !== undefined && editedProfile[field] !== '') {
          formData.append(field, editedProfile[field])
        }
      })

      await api.patch(`/profiles/${profile.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess('Profile updated successfully!')
      setEditMode(false)
      setSelectedFile(null)
      await fetchProfile()
    } catch (err) {
      console.error('Profile update error:', err.response?.data)
      const errorMessage = err.response?.data
        ? Object.entries(err.response.data).map(([key, value]) => `${key}: ${value}`).join(', ')
        : 'Failed to update profile. Please try again.'
      setError(errorMessage)
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight={600}>
            My Profile
          </Typography>
          {!editMode && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          {editMode ? 'Update your profile information' : 'View your profile information'}
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
            {editMode && (
              <Button variant="outlined" component="label">
                Upload Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Roll Number
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {user?.student_id || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Email
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {user?.email || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={editedProfile?.department || ''}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.department || 'Not specified'}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={editedProfile?.year || ''}
                  onChange={handleChange}
                  placeholder="2026, 2027, 2028.."
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Year
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.year || 'Not specified'}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="CGPA"
                  name="cgpa"
                  type="number"
                  inputProps={{ step: 0.01, min: 0, max: 10 }}
                  value={editedProfile?.cgpa || ''}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    CGPA
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.cgpa || 'Not specified'}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={editedProfile?.phone || ''}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Phone
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.phone || 'Not specified'}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={editedProfile?.bio || ''}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Bio
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.bio || 'No bio available'}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  name="linkedin_url"
                  value={editedProfile?.linkedin_url || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    LinkedIn URL
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.linkedin_url ? (
                      <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                        {profile.linkedin_url}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="GitHub URL"
                  name="github_url"
                  value={editedProfile?.github_url || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              ) : (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    GitHub URL
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {profile?.github_url ? (
                      <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                        {profile.github_url}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>

          {editMode && (
            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Profile

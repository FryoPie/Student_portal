import { Drawer, List, ListItem, ListItemText, Typography, Box, IconButton, Button, Divider } from '@mui/material'
import { Close as CloseIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import api from '../services/api'

const NotificationDrawer = ({ open, onClose, onUpdate }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (open) {
      fetchNotifications()
    }
  }, [open])

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/achievements/notifications/')
      setNotifications(response.data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.post(`/achievements/notifications/${id}/mark_read/`)
      fetchNotifications()
      onUpdate()
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.post('/achievements/notifications/mark_all_read/')
      fetchNotifications()
      onUpdate()
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {notifications.length > 0 && (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={markAllAsRead}
            sx={{ mb: 2 }}
          >
            Mark All as Read
          </Button>
        )}

        <List>
          {notifications.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              No notifications
            </Typography>
          ) : (
            notifications.map((notification, index) => (
              <Box key={notification.id}>
                {index > 0 && <Divider />}
                <ListItem
                  sx={{
                    backgroundColor: notification.is_read ? 'transparent' : 'action.hover',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box display="flex" width="100%" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {notification.achievement_title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {new Date(notification.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                    {!notification.is_read && (
                      <IconButton
                        size="small"
                        onClick={() => markAsRead(notification.id)}
                        sx={{ ml: 1 }}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </ListItem>
              </Box>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default NotificationDrawer

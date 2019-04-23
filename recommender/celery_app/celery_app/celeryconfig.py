from datetime import timedelta
from celery.schedules import crontab
# Broker and Backend
BROKER_URL = 'redis://redis:6379'
CELERY_RESULT_BACKEND = 'redis://redis:6379/0'
# Timezone
# CELERY_TIMEZONE='UTC'
# import
CELERY_IMPORTS = (
    'celery_app.task1'
)
# schedules
CELERYBEAT_SCHEDULE = {
    'add-every-5-minutes': {
        'task': 'celery_app.task1.update_recommender',
        'schedule': timedelta(seconds=30)
    }
}

from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Truncates all tables in the database.'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Disable foreign key checks
            cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')

            # Truncate each table
            for table in connection.introspection.table_names():
                cursor.execute(f'TRUNCATE TABLE `{table}`;')
                self.stdout.write(self.style.SUCCESS(f'Table `{table}` truncated.'))

            # Re-enable foreign key checks
            cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')

        self.stdout.write(self.style.SUCCESS('All tables truncated successfully.'))

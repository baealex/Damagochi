from django.contrib import admin

from.models import *

# Register your models here.
@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'ip', 'agent', 'category']
    list_editable = ['category']
    list_filter = ['category']
    list_per_page = 100

admin.site.register(Grade)

@admin.register(ImageCache)
class ImageCacheAdmin(admin.ModelAdmin):
    list_display = ['id', 'key', 'path']
    list_per_page = 50

@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    list_display = ['user', 'agree_email', 'agree_history', 'telegram_id', 'telegram_token', 'password_qna']
    actions = ['send_report']

@admin.register(TempPosts)
class TempPostsAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'title', 'token', 'created_date',]
    list_display_links = ['id', 'title']
    list_filter = ['author']
    list_per_page = 30
    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'title', 'hide', 'created_date', 'updated_date']
    list_display_links = ['id', 'title']
    list_filter = ['author']
    list_per_page = 30

    actions = ['update_md']

    def update_md(self, request, queryset):
        for data in queryset:
            data.text_html = parsedown(data.text_md)
            data.save()
        self.message_user(request, str(len(queryset)) + '개의 포스트 업데이트')

    update_md.short_description = '마크다운 업데이트'

@admin.register(PostLikes)
class PostLikesAdmin(admin.ModelAdmin):
    list_display = ['user', 'post', 'created_date']
    list_filter = ['user']

@admin.register(PostAnalytics)
class PostAnalyticsAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_date', 'posts']
    list_display_links = ['id', 'posts']
    list_filter = ['created_date']
    list_per_page = 30

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'post', 'text_md', 'created_date']
    list_filter = ['author']
    list_per_page = 30

    actions = ['update_md']

    def update_md(self, request, queryset):
        for data in queryset:
            data.text_html = parsedown(data.text_md)
            data.save()
        self.message_user(request, str(len(queryset)) + '개의 댓글 업데이트')

    update_md.short_description = '마크다운 업데이트'

@admin.register(Notify)
class NotifyAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'infomation', 'created_date']

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ['id', 'owner', 'name', 'created_date']

    actions = ['hide']
    
    def hide(self, request, queryset):
        for data in queryset:
            data.hide = True
            data.save()
        self.message_user(request, str(len(queryset)) + '개의 시리즈 숨김')

    hide.short_description = '숨기기'

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'grade']
    list_editable = ['grade']

@admin.register(Referer)
class RefererAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_date', 'posts', 'referer_from']

    def get_fieldsets(self, request, obj=None):
        if request.user.is_superuser:
            fieldsets = (
                    (None, {
                        'fields': (
                            ('created_date'),
                        )
                    }),
                )
        else:
            fieldsets = super().get_fieldsets(request, obj)
        return fieldsets

@admin.register(RefererFrom)
class RefererFromAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'updated_date', 'location',]

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'posts', 'content', 'created_date']
    list_per_page = 10

@admin.register(TelegramSync)
class TelegramSyncAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'tid', 'created_date']

@admin.register(TwoFactorAuth)
class TwoFactorAuthAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_date']

@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title']

@admin.register(Search)
class SearchAdmin(admin.ModelAdmin):
    list_display = ['id', 'search_value', 'created_date']
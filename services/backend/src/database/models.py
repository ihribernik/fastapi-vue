from tortoise import fields, models


class Users(models.Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=20, unique=True)
    full_name = fields.CharField(max_length=50, null=True)
    password = fields.CharField(max_length=128, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)


class Results(models.Model):
    id = fields.IntField(pk=True)
    patient_name = fields.CharField(max_length=225)
    result_type = fields.TextField()
    gen_type = fields.TextField()
    doctor = fields.ForeignKeyField("models.Users", related_name="result")
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

    def __str__(self):
        return f"{self.result_type}, {self.doctor_id} on {self.created_at}"

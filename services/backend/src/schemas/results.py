from typing import Optional

from pydantic import BaseModel

from tortoise.contrib.pydantic import pydantic_model_creator


from src.database.models import Results

ResultInSchema = pydantic_model_creator(
    Results, name="ResultIn", exclude=("doctor_id",), exclude_readonly=True
)
ResultOutSchema = pydantic_model_creator(
    Results,
    name="Result",
    exclude=(
        "modified_at",
        "doctor.password",
        "doctor.created_at",
        "doctor.modified_at",
    ),
)


class UpdateResult(BaseModel):
    patient_name: Optional[str]
    result_type: Optional[str]
    gen_type: Optional[str]

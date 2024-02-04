from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Results
from src.schemas.results import ResultOutSchema
from src.schemas.token import Status


async def get_results():
    return await ResultOutSchema.from_queryset(Results.all())


async def get_result(result_id) -> ResultOutSchema:
    return await ResultOutSchema.from_queryset_single(
        Results.get(id=result_id),
    )


async def create_result(result, current_user) -> ResultOutSchema:
    result_dict = result.dict(exclude_unset=True)
    result_dict["doctor_id"] = current_user.id
    result_obj = await Results.create(**result_dict)
    return await ResultOutSchema.from_tortoise_orm(result_obj)


async def update_result(result_id, result, current_user):
    try:
        db_result = await ResultOutSchema.from_queryset_single(
            Results.get(id=result_id)
        )
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail=f"Result {result_id} not found",
        )

    if db_result.doctor.id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to perform requested action",
        )

    await Results.filter(id=result_id).update(
        **result.dict(exclude_unset=True),
    )
    return await ResultOutSchema.from_queryset_single(
        Results.get(id=result_id),
    )


async def delete_result(result_id, current_user):
    try:
        db_result = await ResultOutSchema.from_queryset_single(
            Results.get(id=result_id)
        )
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail=f"Result {result_id} not found",
        )
    if db_result.doctor.id != current_user.id:

        deleted_count = await Results.filter(id=result_id).delete()
        if not deleted_count:
            raise HTTPException(
                status_code=404,
                detail=f"Result {result_id} not found",
            )

        return Status(message=f"Deleted result {result_id}")

    raise HTTPException(status_code=403, detail=f"Not authorized to delete")

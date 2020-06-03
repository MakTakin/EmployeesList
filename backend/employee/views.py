import json
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from backend.settings import MEDIA_ROOT
from employee.models import Employee


@csrf_exempt
def save_employee(request):
    files = request.FILES.getlist('photo', [])
    if len(files) > 0:
        file = files[0]
        path = os.path.join(MEDIA_ROOT, 'images', file.name)
        with open(path, 'wb+') as f:
            f.write(file.file.read())

    params = request.POST
    if params.get('id', None) is None:
        employee = Employee()
    else:
        employee = Employee.objects.get(id=params.get('id'))

    if len(files) > 0:
        employee.photo = f"/media/images/{file.name}"
    elif params['photo'] is not None:
        employee.photo = f"{params['photo']}"
    else:
        employee.photo = f'/media/images/default.png'
    employee.name = params['name']
    employee.lastname = params['lastname']
    employee.position = params['position']
    employee.birthday = params['birthday'] if params['birthday'] != '' and params['birthday'] != 'null' else None
    employee.remote = True if params['remote'] == 'true' else False
    employee.city = params['city']
    employee.street = params['street']
    employee.house = params['house']
    employee.flat = params['flat']

    employee.save()
    return JsonResponse({}, status=201)


@csrf_exempt
def get_employee(request):
    data = Employee.objects.order_by('id').all()
    data_list = list(data.values())

    for obj in data_list:
        if obj['birthday'] is not None:
            obj['birthday'] = obj['birthday'].strftime("%Y-%m-%d")

    return JsonResponse(json.dumps(data_list), status=200, safe=False)


@csrf_exempt
def delete_employee(request):
    params = json.loads(request.body)
    Employee.objects.filter(id=params['id']).delete()
    return JsonResponse({}, status=200)

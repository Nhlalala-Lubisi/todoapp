from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from todo import models
from todo.models import TODOO
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

def signup(request):
    error = None
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        if User.objects.filter(username=username).exists():
            error = "Username already exists"
        elif User.objects.filter(email=email).exists():
            error = "Email already registered"
        else:
            try:
                my_user = User.objects.create_user(username, email, password)
                my_user.save()
                return redirect('/loginn')
            except IntegrityError:
                error = "Account creation failed"
    
    return render(request, 'signup.html', {'error': error})

def loginn(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)
        
        if not User.objects.filter(username=username).exists():
            return redirect('/?error=user_not_found')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('/todopage')
        else:
            return render(request, 'loginn.html', {'error': 'Incorrect password'})
            
    return render(request, 'loginn.html')

def todo(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        print(title)
        obj = models.TODOO(title=title, user=request.user)
        obj.save()
        return redirect('/todopage')
    
    res = models.TODOO.objects.filter(user=request.user).order_by('-date')
    return render(request, 'todo.html', {'res': res})

def delete_todo(request, todo_id):
    todo = get_object_or_404(TODOO, srno=todo_id, user=request.user)
    todo.delete()
    return redirect('/todopage')

def edit_todo(request, todo_id):
    todo = get_object_or_404(TODOO, srno=todo_id, user=request.user)
    
    if request.method == 'POST':
        new_title = request.POST.get('title')
        todo.title = new_title
        todo.save()
        return redirect('todo')
    
    return render(request, 'edit_todo.html', {'todo': todo})

def signout(request):
    logout(request)
    return redirect('loginn')
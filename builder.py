import pathlib

print("rebuilding webpages...")

#prepare base file
fname = 'workingFiles/index.html'
baseFile = open(fname, 'r', encoding='utf-8')
baseHTML = baseFile.read()
splitHTML = baseHTML.split("<!--where posts go-->")
base = splitHTML

#prepare posts
# directoryPath = 'blogPosts'
# filesList = [p.name for p in pathlib.Path(directoryPath).iterdir() if p.is_file()]
# filesList.sort(reverse=True)
# # print(filesList)
# finalHTML = blog[0]
# # print('finalHTML starts as')
# # print(finalHTML)
# for post in filesList:
#   postName = 'blogPosts/' + post
#   blogPost = open(postName, 'r', encoding='utf-8')
#   postText = blogPost.read()
#   #combine HTML
#   finalHTML = finalHTML + postText
#   # print('finalHTML is now')
#   # print(finalHTML)
#   #split ul at posts and inject the posts in order??
#   #save over the index and blog in the main folder
# finalHTML = finalHTML + blog[1]
# print('finalHTML ends as...')
# print(finalHTML)

pages = ['index','animation','projects','blog']

for page in pages:
  if page == 'index':
    animationList = [p.name for p in pathlib.Path('animationPosts').iterdir() if p.is_file()]
    projectsList = [p.name for p in pathlib.Path('projectsPosts').iterdir() if p.is_file()]
    blogList = [p.name for p in pathlib.Path('blogPosts').iterdir() if p.is_file()]
    filesList = animationList + projectsList + blogList
    filesList.sort(reverse=True)
    finalHTML = base[0]
    # print('finalHTML starts as')
    # print(finalHTML)
    for post in filesList:
      postName = post.split('POSTTYPE')[1].split('.')[0] + 'Posts/' + post
      postText = open(postName, 'r', encoding='utf-8').read()
      # postText = blogPost.read()
      #combine HTML
      finalHTML = finalHTML + postText
      # print('finalHTML is now')
      # print(finalHTML)
      #split ul at posts and inject the posts in order??
      #save over the index and blog in the main folder
    finalHTML = finalHTML + base[1]
    # print('finalHTML ends as...')
    # print(finalHTML)
    fileName = page + ".html"
    try:
      with open(fileName, 'w', encoding='utf-8') as f:
        f.write(finalHTML)
      print(f"Successfully wrote the string to '{fileName}'")
    except IOError as e:
      print(f"An error occured: {e}")
  else:
    directoryPath = page + 'Posts'
    filesList = [p.name for p in pathlib.Path(directoryPath).iterdir() if p.is_file()]
    filesList.sort(reverse=True)
    # print(filesList)
    finalHTML = base[0]
    # print('finalHTML starts as')
    # print(finalHTML)
    for post in filesList:
      postName = page + 'Posts/' + post
      postText = open(postName, 'r', encoding='utf-8').read()
      # postText = blogPost.read()
      #combine HTML
      finalHTML = finalHTML + postText
      # print('finalHTML is now')
      # print(finalHTML)
      #split ul at posts and inject the posts in order??
      #save over the index and blog in the main folder
    finalHTML = finalHTML + base[1]
    # print('finalHTML ends as...')
    # print(finalHTML)
    fileName = page + ".html"
    try:
      with open(fileName, 'w', encoding='utf-8') as f:
        f.write(finalHTML)
      print(f"Successfully wrote the string to '{fileName}'")
    except IOError as e:
      print(f"An error occured: {e}")
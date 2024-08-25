import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})

export class UploadVideoComponent
{
  uploadedFiles: File[] = [];
  videoDetails: { title: string; description: string; thumbnail: File | null }[] = [];
  
  constructor(private videoService: VideoService, private router: Router) {}

  onDragOver(event: DragEvent): void
  {
    event.preventDefault();
    this.highlight();
  }

  onDragLeave(event: DragEvent): void
  {
    event.preventDefault();
    this.unhighlight();
  }

  onDrop(event: DragEvent): void
  {
    event.preventDefault();
    this.unhighlight();
    if (event.dataTransfer?.files)
      this.handleFiles(event.dataTransfer.files);
  }

  onFilesSelected(event: Event): void
  {
    const target = event.target as HTMLInputElement;
    if (target.files)
      this.handleFiles(target.files);
  }

  private handleFiles(files: FileList): void
  {
    const fileListElem = document.getElementById('file-list');
    const continueBtn = document.getElementById('continueBtn');
    this.uploadedFiles = [];
    fileListElem!.innerHTML = '';

    Array.from(files).forEach(file =>
    {
      if (file.type.startsWith('video/'))
      {
          this.uploadedFiles.push(file);
          const listItem = document.createElement('div');
          listItem.textContent = `${file.name} (${this.formatBytes(file.size)})`;
          fileListElem!.appendChild(listItem);
      }
    });

    if (this.uploadedFiles.length > 0)
      continueBtn!.style.display = 'block';
    else
      continueBtn!.style.display = 'none';

    if (fileListElem!.children.length === 0)
    {
      const p = document.createElement('p');
      p.textContent = 'No videos uploaded yet';
      fileListElem!.appendChild(p);
    }
  }

  showVideoDetailsForm(): void
  {
    const videoForms = document.getElementById('videoForms');
    const dropArea = document.getElementById('drop-area');
    const continueBtn = document.getElementById('continueBtn');
    const fileList = document.getElementById('file-list');
    const submitBtn = document.getElementById('submit-button');
    const videoDetails = document.getElementById('videoDetails');

    videoForms!.innerHTML = '';

    dropArea!.style.display = 'none';
    continueBtn!.style.display = 'none';
    fileList!.style.display = 'none';
    submitBtn!.style.display = 'block';

    this.uploadedFiles.forEach((file, index) => {
      const formDiv = document.createElement('div');
      formDiv.innerHTML = `
        <div class="form-container">
            <h4>${file.name}</h4>
            <label for="title-${index}">Title:</label>
            <input class="form-control" type="text" id="title-${index}" name="title" required><br><br>
            <label for="description-${index}">Description:</label><br>
            <textarea class="form-control" id="description-${index}" name="description" rows="4" cols="50" required></textarea><br><br>
            <label for="description">Thumbnail:</label><br>
            <input class="form-control" type="file" id="thumbnail-${index}" accept="image/*" name="thumbnail">
          </div>
      `;
      videoForms!.appendChild(formDiv);
    });
    videoDetails!.style.display = 'block';
  }

  submitVideos(): void
  {
    event?.preventDefault();
    const formData = new FormData();
    this.uploadedFiles.forEach((file, index) => {
      const titleInput = document.getElementById(`title-${index}`) as HTMLInputElement;
      const descriptionInput = document.getElementById(`description-${index}`) as HTMLTextAreaElement;
      const thumbnailInput = document.getElementById(`thumbnail-${index}`) as HTMLInputElement;

      formData.append('title', titleInput.value);
      formData.append('description', descriptionInput.value);
      formData.append('video_file', file);

      if (thumbnailInput.files && thumbnailInput.files.length > 0) {
        formData.append('thumbnail', thumbnailInput.files[0]);
      }
    });

    this.videoService.uploadVideo(formData).subscribe(
      {
        next: (response) => {
          console.log('Video uploaded successfully', response);
          this.router.navigate(['/profile']); // Redirect to profile or another page after successful upload
        },
        error: (error) => {
          console.error('Error uploading video', error);
        }
      }
    );
  }

  private highlight(): void
  {
    const dropArea = document.getElementById('drop-area');
    dropArea!.classList.add('highlight');
  }

  private unhighlight(): void
  {
    const dropArea = document.getElementById('drop-area');
    dropArea!.classList.remove('highlight');
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

const queue=require('../config/kue');
const commentsMailer=require('../mailers/comments_mailer');
queue.process('emails',function(job,done){               //this is the queue
   console.log('emails worker is processing a job ',job.data);
   commentsMailer.newComment(job.data);
   done();
});
<script>
    /** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Envoyez nous un mail !</h1>
			<p class="py-6">
				Entrez un message qui s&#39;affichera dans le contenu du mail qui sera envoyé au recipient. L&#39;email de contact apparaîtra dans le sujet du mail.
			</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl mr-12 bg-base-100">
            <form method="POST" class="card-body">
                <div class="form-control">
                    <label for="recipient" class="label">
                        <span class="label-text">Recipient</span>
                    </label>
                    {#if form}
                        <input type="email" id="recipient" name="recipient" class="input input-bordered" placeholder="{form.recipient}" value="{form.recipient}" />
                    {:else}
                        <input type="email" id="recipient" name="recipient" class="input input-bordered" placeholder="prof@mail.com" />  
                    {/if}               
                </div>
                <div class="form-control">
                    <label for="email" class="label">
                        <span class="label-text">Contact Email</span>
                    </label>
                    {#if form}
                        <input type="email" id="email" name="email" class="input input-bordered" placeholder="{form.email}" value="{form.email}" required />
                    {:else}
                        <input type="email" id="email" name="email" class="input input-bordered" placeholder="fakeSender@mail.com" required />  
                    {/if}   
                </div>
				<div class="form-control">
					<label for="message" class="label">
						<span class="label-text">Message</span>
					</label>
                    <textarea id="message" name="message" class="textarea textarea-bordered" placeholder="Message"></textarea>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">Envoyer</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file-based routing for all dedicated website pages; the fixed platform router provides SSR and deep links.
- Keep official company and project content in browser-safe data modules, separate from presentation; this frontend-only site must not submit or persist enquiries.
- Share navigation, footer, reveal effects and project gallery through focused site components; maintain one identity across distinct page compositions.
